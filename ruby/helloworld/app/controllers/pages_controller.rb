class PagesController < ApplicationController
    def home
        puts "Hello honey, I'm home"
        @greeting = "Home action says: Hello World!"
    end
    def nope
        puts "I'm not entirely sure"
        x = rand(42-10)+10 
        @nope = "This is kinda cool: #{x}"
    end
end
