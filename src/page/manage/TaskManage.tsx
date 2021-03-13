import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, ValueFormatterParams  } from '@material-ui/data-grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField, InputLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './manage.css';
import CloseIcon from '@material-ui/icons/Close';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Tên', width: 350 },
  { field: 'updateDate', headerName: 'Cập nhật', width: 200 },
  {
    field: 'btnEdit',
    headerName: 'Sửa',
    renderCell: (params: GridCellParams) => (
        <EditIcon className="text-primary"/>
    ),
  },
  {
    field: 'btnDelete',
    headerName: 'Xóa',
    renderCell: (params: GridCellParams) => (
        <DeleteIcon className="text-danger"/>
    ),
  },
];

const rows = [
  { id: 1, name: 'Gửi link qua tin nhắn facebook', updateDate: '17/10/2019', },
  { id: 2, name: 'Gửi sms', updateDate: '06/01/2020'},
  { id: 3, name: 'Gọi điện thoại', updateDate: '06/06/2019'},
  { id: 4, name: 'Gửi email', updateDate: '14/03/2019'},
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    modal: {
      position: 'absolute',
      width: '40%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },

    textField: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },

  }),
);

export default function LabelManage() {
  const classes = useStyles();

  const [openModalAdd, setOpenModalAdd] = useState(false);

  const handleOpenModalAdd = () => {
    setOpenModalAdd(true);
  }

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  return (
    <div style={{ height: 400, width: '100%' }} >
      <Button className="btn-add" onClick={handleOpenModalAdd}><AddIcon/></Button>
      <DataGrid rows={rows} columns={columns} pageSize={5} className="mt-20px" hideFooterSelectedRowCount={true}/>
      <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
        <div className={classes.modal}>
          <div className="title-modal">
            <p className="text-right"><CloseIcon onClick={handleCloseModalAdd}/></p>
            <h3 className="text-center">Tạo công việc</h3>
          </div>
          <div className="content-modal">
            <InputLabel>Tên công việc</InputLabel>
            <TextField placeholder="Nhập tên công việc" className={classes.textField}/>
          </div>
          <div className="footer-modal">
              <Button className="btn btn-danger" onClick={handleCloseModalAdd}>Hủy</Button>
              <Button className="btn btn-success">Xác nhận</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}