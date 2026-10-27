class CreateStrokes < ActiveRecord::Migration[8.1]
  def change
    create_table :strokes do |t|
      t.references :board, null: false, foreign_key: true
      t.string :uid, null: false
      t.jsonb :data, null: false
      t.timestamps
    end
    add_index :strokes, %i[board_id uid], unique: true
  end
end
