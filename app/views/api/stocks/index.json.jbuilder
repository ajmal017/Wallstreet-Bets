# json.stock do 
#   @stocks.each do |stock|
#       json.set! stock.symbol do 
#         json.partial! 'api/stocks/stock', stock: stock
#       end
#   end
# end

json.allStocks do 
  @all_stocks.each do |stock|
    json.set! stock.symbol do 
      json.partial! 'api/stocks/stock', stock: stock
    end
  end
end

# json.order do
#   current_user.orders.each do |order|
#     json.set! order.id do 
#       json.partial! 'api/orders/order', order: order
#     end
#   end
# end 

# json.watches do
#   current_user.watches.each do |watch|
#     json.set! watch.symbol do 
#       json.partial! 'api/watches/watch', watch: watch
#     end
#   end
# end


