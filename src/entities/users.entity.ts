import { OrdersEntity } from "./orders.entity"
import { CommentsEntity } from "./comments.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "users",
})
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String

  @Column({
    type: "character varying",
    nullable: false,
  })
  username: string

  @Column({
    type: "character varying",
    nullable: false,
  })
  password: string

  @Column({
    type: "character varying",
    nullable: true,
  })
  phone: string

  @Column({
    type: "character varying",
    nullable: true,
  })
  email: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  img: string

  @Column({
    type: "varchar",
    nullable: true,
  })
  gender: string

  @OneToMany(() => CommentsEntity, (comment) => comment.user)
  comment: CommentsEntity[]

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[]
}
