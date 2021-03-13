import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams  } from '@material-ui/data-grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './manage.css';

const rows = [
  { id: 1, sender: 'admin', from: 'nguyenhongquanbkit@gmail.com', date: '14/01/2021', title: 'Elearning - Trường cao đẳng nghề Bách Khoa', content: '<div class="gwt-HTML">IETLS FIGHTER XIN CHÀO BẠN,<br>Chúng tôi xin gửi bạn mã code học là: <strong>kb6bl7ih</strong><br>Mã code này kích hoạt cho các khóa học sau:<br>#info#</div>', receiver: 'custaspie@gmail.com' },
  { id: 2, sender: 'admin', from: 'nguyenhongquanbkit@gmail.com', date: '14/01/2021', title: 'Elearning - Trường cao đẳng nghề Bách Khoa', content: '<div class="gwt-HTML">IETLS FIGHTER XIN CHÀO BẠN,<br>Chúng tôi xin gửi bạn mã code học là: <strong>kb6bl7ih</strong><br>Mã code này kích hoạt cho các khóa học sau:<br>#info#</div>', receiver: 'manhoangbk2@gmail.com' },
  { id: 3, sender: 'admin', from: 'nguyenhongquanbkit@gmail.com', date: '14/01/2021', title: 'Elearning - Trường cao đẳng nghề Bách Khoa', content: '<div class="gwt-HTML">IETLS FIGHTER XIN CHÀO BẠN,<br>Chúng tôi xin gửi bạn mã code học là: <strong>kb6bl7ih</strong><br>Mã code này kích hoạt cho các khóa học sau:<br>#info#</div>a', receiver: 'tranvhngocanh@gmail.com' },
  { id: 4, sender: 'admin', from: 'nguyenhongquanbkit@gmail.com', date: '14/01/2021', title: 'Elearning - Trường cao đẳng nghề Bách Khoa', content: '<div class="gwt-HTML">IETLS FIGHTER XIN CHÀO BẠN,<br>Chúng tôi xin gửi bạn mã code học là: <strong>kb6bl7ih</strong><br>Mã code này kích hoạt cho các khóa học sau:<br>#info#</div>', receiver: 'custaspie@gmail.com' },
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
    }
  }),
);

export default function MailHistoryManage() {
  const classes = useStyles();

  const [openModalDetail, setOpenModalDetail] = useState(false);

  const handleOpenModalDetail = () => {
    setOpenModalDetail(true);
  }

  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
  };

  const columns: GridColDef[] = [
    { field: 'sender', headerName: 'Người gửi', width: 200 },
    { field: 'from', headerName: 'Từ email', width: 250 },
    { field: 'date', headerName: 'Ngày gửi', width: 150 },
    { field: 'title', headerName: 'Tiêu đề', width: 400 },
    {
      field: 'content',
      headerName: 'Nội dung',
      width: 150,
      renderCell: (params: GridCellParams) => (
          <a onClick={handleOpenModalDetail} href="#">Xem chi tiết</a>
      ),
    },
    { field: 'receiver', headerName: 'Người nhận', width: 250 },
  ];
  
  return (
    <div style={{ height: 400, width: '100%' }} >
      <DataGrid rows={rows} columns={columns} pageSize={5} className="mt-20px" hideFooterSelectedRowCount={true}/>
      <Modal open={openModalDetail} onClose={handleCloseModalDetail}>
        <div className={classes.modal}>
          <div className="title-modal">
            <p className="text-right"><CloseIcon onClick={handleCloseModalDetail}/></p>
            <h3 className="text-center">Nội dung email</h3>
          </div>
          <div className="content-modal">
            IETLS FIGHTER XIN CHÀO BẠN,<br/>
            Chúng tôi xin gửi bạn mã code học là: <strong>kb6bl7ih</strong><br/>
            Mã code này kích hoạt cho các khóa học sau:<br/>
            #info#
          </div>
        </div>
      </Modal>
    </div>
  );
}