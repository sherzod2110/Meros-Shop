import { ProductEntity } from "./product.entity"
import { SubCategoryEntity } from "./subCategory.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "dublsubcategory",
})
export class DublSubCategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
    length: 30,
  })
  title!: string

  @Column("uuid")
  subCatId: string | null

  @ManyToOne(() => SubCategoryEntity, (subCategory) => subCategory.dublSub, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  subCat: SubCategoryEntity

  @OneToMany(() => ProductEntity, (product) => product.dublSub)
  product: ProductEntity[]
}
