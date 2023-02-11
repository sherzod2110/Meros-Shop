import { ProductEntity } from "./product.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { UsersEntity } from "./users.entity"

@Entity({
  name: "orders",
})
export class OrdersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    default: 0,
  })
  count: number

  @ManyToOne(() => ProductEntity, (product) => product.order, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  product: ProductEntity

  @ManyToOne(() => UsersEntity, (user) => user.orders, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  user: UsersEntity
}
