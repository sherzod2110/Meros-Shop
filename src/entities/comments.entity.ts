import { ProductEntity } from "./product.entity"
import { UsersEntity } from "./users.entity"
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "comments",
})
export class CommentsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String

  @Column({
    type: "character varying",
    nullable: false,
  })
  title: string

  @ManyToOne(() => UsersEntity, (user) => user.comment, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  user: UsersEntity

  @ManyToOne(() => ProductEntity, (product) => product.comment, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  product: ProductEntity
}
