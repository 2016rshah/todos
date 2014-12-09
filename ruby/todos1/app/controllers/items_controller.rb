class ItemsController < ApplicationController
  def index
    @item = Item.new
    @items = Item.all
  end
  
  def create
    @item = Item.new(params.require(:item).permit(:content, :user_id, :completed))
    if @item.save 
      redirect_to root_path
    else
      render index
    end
  end
end
