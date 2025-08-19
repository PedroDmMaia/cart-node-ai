import { Injectable } from "@nestjs/common";
import { PostgresService } from "../shared/postgres.service";

type IProduct = {
  id: number
  name: string
  price: number
  store_ìd: number
  embedding: number[] | null
}

@Injectable()
export class CatalogService {
  constructor(
    private readonly postgresService: PostgresService
  ) { }

  async getCatalog(search: string = '') {
    let query = `SELECT products.id, products.name, products.price, products.embedding, json_build_object('id', stores.id, 'name', stores.name) as store FROM products
        JOIN stores ON products.store_id = stores.id`

    const values: string[] = []
    if (search) {
      query += ` WHERE products.name ILIKE $1`
      values.push(`%${search}%`)
    }

    const result = await this.postgresService.client.query<IProduct>(query, values)

    return result.rows
  }
}
