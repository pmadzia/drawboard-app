class CreateBoards < ActiveRecord::Migration[8.1]
  def change
    create_table :boards do |t|
      t.string :name
      t.string :slug
      t.string :creator

      t.timestamps
    end
    add_index :boards, :slug, unique: true
  end
end
