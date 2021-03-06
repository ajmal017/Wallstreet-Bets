class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :user_id, null: false
      t.integer :stock_id, null: false
      t.float :price, null: false
      t.float :shares, null: false
      t.string :order_type, null: false
      t.timestamps
    end
  end
end
