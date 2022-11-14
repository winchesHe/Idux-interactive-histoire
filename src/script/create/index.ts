import { Command } from 'commander'
import { create } from './create'
const program = new Command()

program
  .command('create')
  .arguments('[components...]')
  .option('-g, --grid [value]', '控制展示是否需要网格展示', false)
  .description('创建一个组件文档')
  .action(create)
program.parse()
