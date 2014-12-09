class Item < ActiveRecord::Base
    validates :content, presence: true
    validates :user_id, presence: true
    # validates :completed, presence: true # I think you can't do this because if it passes false then it thinks it doesn't exist...
    #validates :completed, presence: true, inclusion: [true, false]
end