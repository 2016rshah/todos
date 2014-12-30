class ItemsController < ApplicationController
    
    def index
        @items = Item.all.order("created_at DESC")
    end
    
    def new
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
        params.require(:item).permit(:content)
    end
    
end
