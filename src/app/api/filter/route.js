import { NextResponse } from "next/server";
import productsJson from "@/../data/product.json";

export async function POST(request) {
  try {
    let body = await request.json();

    let filtered = productsJson.filter((element) => {
      const category = body.category.includes(element.category);
      const size = body.size == element.size;

      let price = false;
      //checking min-max price.

      if (body.price.includes("0-50")) {
        price = price || (element.price >= 0 && element.price <= 50);
        console.log("LESS PRICE", price);
      }
      if (body.price.includes("51-100"))
        price = price || (element.price >= 51 && element.price <= 100);

      if (body.price.includes("101")) price = price || element.price >= 101;

      return category || size || price
    });
    console.log(filtered);

    return NextResponse.json(filtered);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
