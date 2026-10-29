-- Order numbers start at SNS-24001. Stock cannot go below zero.

CREATE SEQUENCE "order_number_seq" START WITH 24001 INCREMENT BY 1;

ALTER TABLE "Order" ALTER COLUMN "orderNumber" SET DEFAULT ('SNS-' || nextval('order_number_seq'::regclass));

ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_stockQty_nonnegative" CHECK ("stockQty" >= 0);
