export const tableMixin = {
  data () {
    return {
      loading: true,
      data: [],
      pageSize: 10,
      current: 0,
      total: 0
    }
  },
  mounted () {
    this.GetData()
  },
  methods: {
    onTableChange (pagination, filters, sorter) {
      this.pageSize = pagination.pageSize
      this.current = Number(pagination.current) - 1
      this.GetData()
    },
    search (data) {
      this.GetData({ ...data })
    }
  }
}
