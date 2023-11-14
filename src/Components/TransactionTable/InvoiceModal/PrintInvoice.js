import React, { forwardRef } from "react";
import Invoice from "../../Invoice/Invoice";

const PrintInvoice = forwardRef((props, ref) => {
  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    // Fetch the invoice data from localStorage
    let invoiceData = localStorage.getItem("currentInvoice");
    if (invoiceData !== null) {
      invoiceData = JSON.parse(invoiceData);
      setItem(invoiceData);
    }
  }, []);

  return (
    <div ref={ref}>
      {item ? (
        <Invoice className="className" data={item} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
});

export default PrintInvoice;
