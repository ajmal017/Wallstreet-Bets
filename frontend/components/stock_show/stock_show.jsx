import React from 'react';
import NewsIndexItem from '../home/news/news_index_item';
import StockItemChartContainer from '../home/stock_item_chart_container';
import OrderFormContainer from '../../components/stock_show/order_form_container';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      intradayData: []
    };
    this.setWatchStatus = this.setWatchStatus.bind(this);
    this.handleWatchClick = this.handleWatchClick.bind(this);
    this.showOrderForm = this.showOrderForm.bind(this);
  }

  componentDidMount() {
    if (!this.props.allStocks) {
      this.props.fetchUserStocks().then(() => this.props.fetchStocks()); 
    }
    this.props.fetchStockInfo(this.props.match.params.symbol);
    this.props.fetchStockNews(this.props.match.params.symbol);
    this.props.fetchStockIntradayData(this.props.match.params.symbol).then(result => this.setState({
      intradayData: result.intradayData.chart,
      price: result.intradayData.chart[result.intradayData.chart.length - 1].close
    }));

  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.match.params.symbol !== this.props.match.params.symbol) {
      window.location.reload(false);
    }
  }

  showOrderForm(){
    const orderForm = document.querySelector('.stock-order-container');
    if (orderForm.classList.contains("open")) {
        orderForm.classList.remove("open");
    } else {
        orderForm.classList.add("open");
    }
}

  setWatchStatus() {
    if (this.props.watchSymbols.includes(this.props.stock.symbol)) {
      return (
        <div className="watch-btn" onClick={this.handleWatchClick}>Remove From Watchlist</div>
      )
    } else {
      return (
        <div className="watch-btn" onClick={this.handleWatchClick}>Add To Watchlist</div>
      )
    }
  }

  handleWatchClick(e) {
    if (e.target.innerText === "Add To Watchlist") {
      this.props.addToWatches({
        symbol: this.props.stock.symbol
      });
    } else if (e.target.innerText === "Remove From Watchlist") {
      this.props.removeFromWatches(
        this.props.watches[this.props.stock.symbol].id,
        this.props.stock.symbol
      );
    }
  }

  render() {
    const { stock, news } = this.props
      if (!stock) {
        return null;
      } else {
        return ( 
          <div className="stock-show-main">
            <div className="stock-show-container-1">
                  <StockItemChartContainer
                    // intradayData={this.state.intradayData}
                    // info={info}
                    // historicalData={stock.historicalData}
                    stock={stock}
                    name='stock-show-chart'
                  />
                <div className="mobile-stock-show-wrapper">
                  <div className="mobile-stock-show">
                    <div className="show-order-form" onClick={this.showOrderForm}>
                      Buy/Sell Stock
                    </div>
                    {this.setWatchStatus()}
                  </div>
                </div>
                <div className="stock-info-container">
                  <div className="stock-info-header">About</div>
                  <div className="stock-info-description">
                    {stock.description}
                  </div>
                  <div className="stock-stats-container">
                    <div className="stock-stats-1">
                      <div>
                        <div className="about-headers">CEO</div>
                        <div>{stock.CEO}</div>
                      </div>
                      <div>
                        <div className="about-headers">Employees</div>  
                        <div>{stock.employees}</div>
                      </div>
                      <div>
                        <div className="about-headers">Headquarters</div>
                        <div>{stock.city} {stock.state}</div>
                      </div>
                      <div>
                        <div className="about-headers">Exchange</div>
                        <div>{stock.exchange}</div>
                      </div>
                    </div> 
                    <div className="stock-stats-2">
                        {/* <div>{stock.info.state}</div>
                        <div>{stock.info.city}</div>
                        <div>{stock.info.employees}</div> */}
                    </div>
                  </div>
                </div>
                <div className="stock-show-news-container">
                  <div className="index-title">
                    Recent News
                    </div>
                  {news.slice(0,5).map(singleNews => {
                    return (
                      <div className="news-index-item">
                        <NewsIndexItem
                          key={singleNews.id}
                          url={singleNews.url}
                          source={singleNews.source.name}
                          title={singleNews.title}
                          description={singleNews.description}
                          image={singleNews.urlToImage}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            <div className="stock-show-container-2">
              <OrderFormContainer
                stock={stock}
                // intradayData={stock.intradayData}
                price={this.state.price}
                symbol={this.props.match.params.symbol}
              />
            </div>
          </div>
        )
      }
  }
};

export default StockShow;