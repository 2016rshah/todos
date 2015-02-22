class AddTodoListsToUser < ActiveRecord::Migration
  def change
    add_column :users, :todo_lists, :todo_lists
  end
end
