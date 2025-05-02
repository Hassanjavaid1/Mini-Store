import { NextResponse } from "next/server";
import productsJson from "@/../data/product.json";

export async function GET(request) {
  try {
    return NextResponse.json(productsJson);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
