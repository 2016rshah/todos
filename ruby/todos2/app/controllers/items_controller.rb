class ItemsController < ApplicationController
    
    def index
        @item = Item.new
        @items = Item.all.order("created_at DESC")
    end
    
    def new
        @item = Item.new
    end
    
    def create
        @item = Item.new(item_params)
        @item.save
        redirect_to root_path
    end
    
    def show
        @item = Item.find(params[:id])
    end
    
    private
    
    def item_params
        params.require(:item).permit(:content, :completed)
    end
    
end
