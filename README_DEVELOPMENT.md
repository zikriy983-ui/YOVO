````markdown
# متجر YOVO الإلكتروني - دليل التطوير

## نظرة عامة
متجر YOVO هو منصة تسوق إلكترونية متكاملة للمنتجات الرقمية

## المميزات الرئيسية
✅ المصادقة والحسابات الشخصية
✅ إدارة المنتجات الرقمية
✅ سلة التسوق
✅ نظام الدفع PayPal
✅ تنزيل المنتجات
✅ التقييمات والتعليقات
✅ قائمة الرغبات

## البنية التحتية
```
yovo/
├── models/
├── routes/
├── middleware/
├── public/
├── src/
├── server.js
└── package.json
```

## التثبيت
1. npm install
2. cp .env.example .env
3. npm run dev

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- POST /api/cart/add
- POST /api/payments/paypal/create
````
