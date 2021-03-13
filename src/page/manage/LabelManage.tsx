import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, ValueFormatterParams  } from '@material-ui/data-grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField, InputLabel, FormControlLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './manage.css';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';

const columns: GridColDef[] = [
  {
    field: 'labelName',
    headerName: 'Tên nhãn',
    width: 350,
    renderCell: (params: ValueFormatterParams) => (
        <label className='label' style={{backgroundColor:'rgb(6, 122, 193)'}}>
          {params.value}
        </label>
    ),
  },
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
  { id: 1, labelName: 'Vip', updateDate: '17/10/2019', },
  { id: 2, labelName: 'Đang quan tâm', updateDate: '06/01/2020'},
  { id: 3, labelName: 'SĐT không đúng', updateDate: '06/06/2019'},
  { id: 4, labelName: 'Hẹn mua', updateDate: '14/03/2019'},
  { id: 5, labelName: 'Không có nhu cầu', updateDate: '06/06/2019'},
  { id: 6, labelName: 'Đang thương lượng', updateDate: '25/06/2019'},
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

const CheckboxColor01 = withStyles({
  root: {
    color: 'rgb(85, 231, 148)',
    '&$checked': {
      color: 'rgb(85, 231, 148)',
    },
  },
}) ((props: CheckboxProps) => <Checkbox color="default" {...props} />);;
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
            <h3 className="text-center">Tạo nhãn</h3>
          </div>
          <div className="content-modal">
            <InputLabel>Tên nhãn</InputLabel>
            <TextField placeholder="Nhập tên nhãn" className={classes.textField}/>
            <InputLabel className="marginTop20px" style={{marginBottom: '10px'}}>Màu</InputLabel>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(85, 231, 148)'}}><CheckIcon/></div>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(212, 126, 46)'}}></div>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(5, 169, 76)'}}></div>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(214, 28, 0)'}}></div>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(253, 158, 2)'}}></div>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(6, 122, 193)'}}></div>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(253, 122, 205)'}}></div>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(53, 82, 100)'}}></div>
             <div className="checkbox-color glyphicon" style={{backgroundColor: 'rgb(107, 128, 140)'}}></div>
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