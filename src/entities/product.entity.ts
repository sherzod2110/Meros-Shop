import { OrdersEntity } from "./orders.entity"
import { Reyting } from "./reyting.entity"
import { CommentsEntity } from "./comments.entity"
import { DublSubCategoryEntity } from "./dublSubCategory.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "product",
})
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
    length: 30,
    nullable: true,
  })
  title!: string

  @Column("decimal", {
    nullable: true,
  })
  price: number
  
  @Column("decimal", {
    nullable: true,
    default: 0,
  })
  new_price: number

  @Column({
    type: Number,
    nullable: true,
  })
  chegirma: number

  @Column({
    type: "varchar",
    nullable: true,
  })
  comments: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  brand: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  size: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  author: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  discription: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  color: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  madeIn: string

  @Column({
    nullable: true,
    default: 0,
  })
  sotildi: number

  @Column({
    type: "varchar",
    nullable: true,
  })
  img: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  img1: string


  @Column("uuid", {
    name: "dublSubId",
  })
  dublSubId: string | null

  @ManyToOne(() => DublSubCategoryEntity, (subCategory) => subCategory.product, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  dublSub: DublSubCategoryEntity

  @OneToMany(() => Reyting, (rate) => rate.product)
  reyting: Reyting[]

  @OneToMany(() => CommentsEntity, (comment) => comment.product)
  comment: CommentsEntity[]

  @OneToMany(() => OrdersEntity, (order) => order.product)
  order: OrdersEntity[]
}
