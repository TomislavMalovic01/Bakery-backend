import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { ProductIngredient } from "./ProductIngredient";

@Index("name_UNIQUE", ["name"], { unique: true })
@Index("fk_product_category_id_idx", ["categoryId"], {})
@Entity("product", { schema: "bakery" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "product_id", unsigned: true })
  productId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("varchar", { name: "image", length: 255 })
  image: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("varchar", { name: "unit", length: 50 })
  unit: string;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price: string;

  @Column("decimal", { name: "energy_valiue", precision: 10, scale: 2 })
  energyValiue: string;

  @Column("int", { name: "category_id", unsigned: true })
  categoryId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToMany(
    () => ProductIngredient,
    (productIngredient) => productIngredient.product
  )
  productIngredients: ProductIngredient[];
}
