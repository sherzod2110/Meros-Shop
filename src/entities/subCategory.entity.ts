import { DublSubCategoryEntity } from "./dublSubCategory.entity"
import { CategoryEntity } from "./category.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "subcategory",
})
export class SubCategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
    length: 30,
  })
  title!: string

  @Column("uuid")
  categoriesId: string

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  categories: CategoryEntity

  @OneToMany(() => DublSubCategoryEntity, (dublSubCat) => dublSubCat.subCat)
  dublSub: DublSubCategoryEntity[]
}
