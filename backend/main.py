from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory Management API Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pydantic Schemas ──────────────────────────────────────────────────────────

class ProductCreate(BaseModel):
    sku: str
    name: str
    price: float
    stock_quantity: int

class CustomerCreate(BaseModel):
    name: str
    email: EmailStr

class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int

# ── Startup Seed ──────────────────────────────────────────────────────────────

@app.on_event("startup")
def setup_dummy_data():
    db = next(get_db())
    if db.query(models.Product).count() == 0:
        dummy_product = models.Product(
            sku="PROD-101", name="Wireless Mouse", price=25.99, stock_quantity=10
        )
        dummy_customer = models.Customer(name="John Doe", email="john@example.com")
        db.add(dummy_product)
        db.add(dummy_customer)
        db.commit()
    db.close()

# ── Products ──────────────────────────────────────────────────────────────────

@app.get("/products/")
def list_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@app.post("/products/")
def create_product(product_data: ProductCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Product).filter(
        models.Product.sku == product_data.sku
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="SKU already exists.")
    product = models.Product(**product_data.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

# ── Customers ─────────────────────────────────────────────────────────────────

@app.get("/customers/")
def list_customers(db: Session = Depends(get_db)):
    return db.query(models.Customer).all()

@app.post("/customers/")
def create_customer(customer_data: CustomerCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Customer).filter(
        models.Customer.email == customer_data.email
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered.")
    customer = models.Customer(**customer_data.model_dump())
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

# ── Orders ────────────────────────────────────────────────────────────────────

@app.get("/orders/")
def list_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).all()

@app.post("/orders/")
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(
        models.Product.id == order_data.product_id
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product entity reference missing.")

    customer = db.query(models.Customer).filter(
        models.Customer.id == order_data.customer_id
    ).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer entity reference missing.")

    if product.stock_quantity < order_data.quantity:
        raise HTTPException(status_code=400, detail="Insufficient product stock!")

    product.stock_quantity -= order_data.quantity

    new_order = models.Order(
        customer_id=order_data.customer_id,
        product_id=order_data.product_id,
        quantity=order_data.quantity,
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {
        "status": "Success",
        "message": "Order placed successfully!",
        "order_id": new_order.id,
        "remaining_stock": product.stock_quantity,
    }

# ── Health ────────────────────────────────────────────────────────────────────

@app.get("/health")
def health_check():
    return {"status": "ok"}
