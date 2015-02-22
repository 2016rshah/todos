class TodoListsController < ApplicationController
  before_action :set_todo_list, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    if user_signed_in?
      #@todo_lists = TodoList.all
      @todo_lists = current_user.todo_lists
      respond_with(@todo_lists)
    else
      redirect_to new_user_session_path
    end
  end

  def show
    respond_with(@todo_list)
  end

  def new
    @todo_list = TodoList.new
    respond_with(@todo_list)
  end

  def edit
  end

  def create
    @todo_list = TodoList.new(todo_list_params)
    @todo_list.user_id = current_user.id
    @todo_list.save
    respond_with(@todo_list)
  end

  def update
    @todo_list.update(todo_list_params)
    respond_with(@todo_list)
  end

  def destroy
    @todo_list.destroy
    respond_with(@todo_list)
  end

  private
    def set_todo_list
      @todo_list = TodoList.find(params[:id])
    end

    def todo_list_params
      params.require(:todo_list).permit(:title)
    end
end
