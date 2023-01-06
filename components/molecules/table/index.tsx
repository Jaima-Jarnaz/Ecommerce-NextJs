import { BODY } from "./tables";
import Icon from "@/components/atoms/icon";
import { useRouter } from "next/router";
import baseUrl from "helpers/baseUrl";
import { useEffect, useState } from "react";
import { Modal } from "@/components/molecules/modal";
import { Note } from "@/components/atoms/note/index.";

export type TableProps = {
  children?: React.ReactNode;
  body: any;
};
export const Table: React.FC<TableProps> = ({ body }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [deleteId, setDeleteId] = useState<string>("");

  const confirmDeleteHandler = async (id: string) => {
    setOpenModal(true);
    setDeleteId(id);
  };

  const deleteHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/product/${deleteId}`, {
        method: "DELETE",
      });
      await res.json();
      setOpenModal(false);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => {
    setOpenModal(false);
  };

  return (
    <div className="m-table">
      {isSuccess ? <Note color="danger">Product has been deleted</Note> : ""}

      {openModal ? (
        <Modal cancelHandler={cancelHandler} deleteHandler={deleteHandler}>
          Are you sure you want to delete?
        </Modal>
      ) : (
        ""
      )}

      <table className="m-table__table">
        <thead className="m-table__heading">
          <tr>
            <th className="m-table__content">#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Colors</th>
            <td className="m-table__content">order</td>
            <th className="m-table__content">Actions</th>
          </tr>
        </thead>
        <tbody>
          {body &&
            body.map((item: any, index: number) => {
              return (
                <tr key={index} className="m-table__content">
                  <td className="m-table__content">{++index}</td>
                  <td className="m-table__content">{item.name}</td>
                  <td className="m-table__content">{item.description}</td>
                  <td className="m-table__content">{item.price}</td>
                  <td className="m-table__content">Green</td>
                  <td className="m-table__content">Green</td>

                  <td>
                    <span className="m-table__action">
                      <Icon iconName="edit" />
                    </span>
                    <span
                      className="m-table__action"
                      onClick={() => {
                        setOpenModal(!openModal);
                        confirmDeleteHandler(item._id);
                      }}
                    >
                      <Icon iconName="delete" />
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
