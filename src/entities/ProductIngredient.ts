import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Product } from "./Product";

@Index("fk_product_ingredient_ingredient_idx", ["ingredientId"], {})
@Entity("product_ingredient", { schema: "bakery" })
export class ProductIngredient {
  @Column("int", { primary: true, name: "product_id", unsigned: true })
  productId: number;

  @Column("int", { primary: true, name: "ingredient_id", unsigned: true })
  ingredientId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.productIngredients, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ingredient_id", referencedColumnName: "ingredientId" }])
  ingredient: Ingredient;

  @ManyToOne(() => Product, (product) => product.productIngredients, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
    name: string;
}
