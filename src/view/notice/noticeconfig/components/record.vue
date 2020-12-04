<template>
  <Modal  :mask="true" v-model="recordVisible" title="通知记录" width="700px">
   <div class="search-con search-con-top">
        <Input clearable placeholder="输入关键字搜索" class="search-input" style="width: 100px;margin-right: 5px" v-model="searchValue" />
        <Button @click="handleSearch"  class="search-btn" type="primary">
          <Icon type="search" />&nbsp;&nbsp;搜索</Button>
      </div>
      <Table border :columns="columns12" :data="records">
        <template slot-scope="{ row }" slot="status">
          <Tag :color="row.state=='error'?'error':'success'">row.state.text</Tag>
           <Button type="primary" size="small" style="margin-right: 5px" @click="lookFun(row)">查看</Button>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="lookDataFun(row)">查看数据</Button>
        </template>
      </Table>
      <Page :total="page.total" :current="page.index" :page-size="page.size" show-sizer @on-change="changeIndexPage"
        @on-page-size-change="changePageSize" />
    <div slot="footer">
      <Button style="margin-right: 8px" @click="recordVisible = false">取消</Button>
      <Button type="primary" @click="asyncOK">确定</Button>
    </div>
     <Modal v-model="errorVisible" :title="title" @on-ok="OK">
       <Input v-model="content" type="textarea" :rows="4"  />
     </Modal>
  </Modal>
</template>

<script>
import {
    getMetadata,
    saveConfig
  } from '@/api/notice/noticeconfig/data'
  import {
    getDate
  } from '@/libs/tools'
  export default {
    props:['records'],
    data() {
      return {
        recordVisible: false,
        errorVisible:false,
        title:'',
        content:'',
        searchValue:'',
        page: {
          index: 1,
          size: 10,
          total: 0
        },
        columns12: [{
            title: 'ID',
            key: 'id'
          },
          {
            title: '时间',
            key: 'notifyTime',
            render: (h, params) => {
              const row = params.row;
              return h('div', [
                h('span', {}, getDate(row.notifyTime, 'year')),
              ]);
            }
          },
          {
            title: '状态',
            slot: 'status'
          },
          {
            title: '操作',
            slot: 'action',
            width: 220,
            align: 'center'
          }
        ],
        // tableList: []
      }
    },
    methods: {
      OK(){},
      asyncOK() {

      },
      changeIndexPage(i) {
        // i是分页中当前页的页码
        this.page.index = i;
        this.getData()
      },
      changePageSize(s) {
        // s为页面大小
        this.page.index = 1;
        this.page.size = s;
        this.getData()
      },
      handleSearch(){},
      lookDataFun(row){
         this.content = row.context
         this.title = '详情'
      },
      lookFun(row){
        this.content = row.errorStack
        this.title = '错误信息'
      }
    },
  }
</script>

<style lang="less" scoped="scoped">
  .search-con {
    padding: 10px 0;

    .search {
      &-col {
        display: inline-block;
        width: 200px;
      }

      &-input {
        display: inline-block;
        width: 200px;
        margin-left: 2px;
      }

      &-btn {
        margin-left: 2px;
      }
    }
  }
  .ivu-page {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .ivu-modal-no-mask {

      pointer-events: auto;

  }
</style>
