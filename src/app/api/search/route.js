import { NextResponse } from "next/server";
import productsJson from "@/../data/product.json";

export async function GET(request) {
  try {
    const search = request.nextUrl.searchParams.get("q") || "";
    let queryResult = productsJson.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    console.log(queryResult);
    return NextResponse.json(queryResult);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
