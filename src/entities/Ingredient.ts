import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductIngredient } from "./ProductIngredient";

@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("ingredient", { schema: "bakery" })
export class Ingredient {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ingredient_id",
    unsigned: true,
  })
  ingredientId: number;

  @Column("varchar", { name: "name", unique: true, length: 45 })
  name: string;

  @Column("tinyint", { name: "is_vegan", default: () => "'1'" })
  isVegan: number;

  @Column("tinyint", { name: "is_vegeterian", default: () => "'1'" })
  isVegeterian: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "delete_at", nullable: true })
  deleteAt: Date | null;

  @Column("int", { name: "category_id", nullable: true })
  categoryId: number | null;

  @OneToMany(
    () => ProductIngredient,
    (productIngredient) => productIngredient.ingredient
  )
  productIngredients: ProductIngredient[];
}
