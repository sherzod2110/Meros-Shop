import { SubCategoryEntity } from "./subCategory.entity"
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "category",
})
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
    length: 30,
  })
  title!: string

  @OneToMany(() => SubCategoryEntity, (subCat) => subCat.categories)
  subCategories: SubCategoryEntity[]
}
