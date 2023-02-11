import { ProductEntity } from "./product.entity"
import { UsersEntity } from "./users.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "reyting",
})
export class Reyting {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("decimal", {
    nullable: true,
    default: 0,
  })
  reyting: number

  @Column({
    nullable: true,
    default: 0,
  })
  all_count: number

  @Column({
    nullable: true,
    default: 0,
  })
  person_count: number

  @ManyToOne(() => ProductEntity, (product) => product.reyting, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  product: ProductEntity
}
