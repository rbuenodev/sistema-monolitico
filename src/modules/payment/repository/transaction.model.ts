import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "transaction",
  timestamps: false,
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;
  @Column({ allowNull: false })
  orderId: string;
  @Column({ allowNull: false })
  amount: number;
  @Column({ allowNull: false })
  status: string;
  @Column({ allowNull: false })
  createdAt: Date;
  @Column({ allowNull: false })
  updatedAt: Date;
}
