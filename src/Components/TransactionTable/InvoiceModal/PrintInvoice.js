import React from "react";
import Invoice from "../../Invoice/Invoice";

class PrintInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
    };
  }

  componentDidMount() {
    // Fetch the invoice data from localStorage
    let item = localStorage.getItem("currentInvoice");
    if (item !== undefined || item !== "undefined") {
      item = JSON.parse(item);
      this.setState({ item });
    }
  }

  render() {
    const { item } = this.state;

    return (
      <div>
        {item ? (
          <Invoice className="className" invoice={item} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default PrintInvoice;
