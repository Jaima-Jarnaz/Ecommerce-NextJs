import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableData,
  TableColGroup,
  TableCol,
} from "@/components/molecules/custom-table";
import AdminLayout from "templates/adminLayout";
import Section from "@/components/atoms/section";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Icon from "@/components/atoms/icon";
import Heading from "@/components/atoms/heading";

const tableHeadings = [
  "Orderd date",
  "Delivery Place",
  "Products",
  "Customer",
  "Amount",
  "Status",
  "Action",
];

const Orders = ({ orders }: any) => {
  const router = useRouter();

  return (
    <div className="p-order">
      <div className="p-order__table">
        <h4 className="p-order__heading">Order Deatils</h4>
        <div className="p-order__table-content">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Orderd date</TableHeader>
                <TableHeader>Order ID</TableHeader>
                <TableHeader style={{ minWidth: "300px" }}>
                  Products Details
                </TableHeader>
                <TableHeader style={{ minWidth: "250px" }}>
                  Delivery Place
                </TableHeader>
                <TableHeader style={{ minWidth: "250px" }}>
                  Customer
                </TableHeader>
                <TableHeader style={{ minWidth: "200px" }}>Amount</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Payment method</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableData>{item.dateCreated}</TableData>
                    <TableData>{item._id}</TableData>
                    <TableData>
                      {item.products.products.map(
                        (item: any, index: number) => {
                          return (
                            <div key={index} className="p-order__product">
                              <div>
                                <span>Name : </span>
                                <span>{item.name}</span>
                              </div>
                              <div>
                                <span>Price : </span>
                                <span>{item.price}</span>
                              </div>
                              <div>
                                <span>Quantity : </span>
                                <span>{item.quantity}</span>
                              </div>
                              <div>
                                <span>Color : </span>
                                <span>{item.color}</span>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </TableData>
                    <TableData>
                      <div>
                        <span>Address : </span>
                        <span>{item.deliveryPlace.address}</span>
                      </div>
                      <div>
                        <span>City : </span>
                        <span>{item.deliveryPlace.city}</span>
                      </div>
                      <div>
                        <span>Division : </span>
                        <span>{item.deliveryPlace.division}</span>
                      </div>
                    </TableData>

                    <TableData>
                      <div>
                        <span>Name : </span>
                        <span> {item.customer.name}</span>
                      </div>
                      <div>
                        <span>Email : </span>
                        <span> {item.customer.email}</span>
                      </div>
                      <div>
                        <span>Phone : </span>
                        <span> {item.customer.phone}</span>
                      </div>
                    </TableData>
                    <TableData>
                      <div>
                        <span>Sub Total : </span>
                        <span> {item.products.subTotal}</span>
                      </div>
                      <div>
                        <span>Total : </span>
                        <span> {item.products.total}</span>
                      </div>
                    </TableData>
                    <TableData>In progress</TableData>
                    <TableData>Cash on delivery</TableData>
                    <TableData>
                      <span
                        className="m-table__action"
                        onClick={() => {
                          router.push(`/admin/orders/update/${item._id}`);
                        }}
                      >
                        <Icon iconName="edit" />
                      </span>
                      <span
                        className="m-table__action"
                        //   onClick={() => {
                        //     setOpenModal(!openModal);
                        //     confirmDeleteHandler(item._id);
                        //   }}
                      >
                        <Icon iconName="delete" />
                      </span>
                    </TableData>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

Orders.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Orders;

export const getServerSideProps: GetServerSideProps = async () => {
  //----------Get all orders----------
  const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_GET_ALL_API}`);
  const data = await res.json();

  return {
    props: {
      orders: data.orders,
    },
  };
};
