const ch2en = {
  'OEXSWAP 交易挖矿产出计划': 'Output Plan of OEXSWAP Trading Mining',
  'OEXSWAP 交易挖矿参与细则': 'Rules for Participation in OEXSWAP Trading Mining',
  'OEXSWAP 雇佣挖矿参与细则': 'Rules for Participation in OEXSWAP Hired Mining',
  miningText1:
    'Only when the number of account addresses held in the chain of token is ≥100 can a trading pair containing the token be created. For example, if there are 100 chain accounts holding AA token, AA/OEX trading pairs can be successfully created; There are only 99 chain accounts holding BB token, so BB/OEX trading pair cannot be created.',
  miningTtile2: 'The initial output of each block in OEXSWAP Trading Mining are 10 OEX tokens, which is halved for three times every 90 days, and 2,592,000 blocks are produced in each cycle.',
  miningTtile3: 'Cycle 1: From block height 4,978,888, each block will produce 10 OEX tokens, and it is planned to produce 25,920,000 OEX tokens.',
  miningTtile4: 'Cycle 2: From the block height 7,570,888, each block will produce 5 OEX tokens, and it is planned to produce 12,960,000 OEX tokens.',
  miningTtile5: 'Cycle 3: From the block height 10,162,888, each block will produce 2.5 OEX tokens, and it is planned to produce 6,480,000 OEX tokens.',
  miningTtile6: 'Cycle 4: From the block height 12,754,888, each block will produce 1.25 OEX tokens, and it is planned to produce 3,240,000 OEX tokens.',
  miningTtile7: 'OEXSWAP Trading Mining will last 360 days, and it is planned to produce 48,600,000 OEX tokens.',
  miningTtile8:
    '1,The trading pairs involved in Trading Mining must take OEX tokens as the anchor. For example, AA/OEX trading pairs composed of AA token and OEX token can participate in Trading Mining; The AA/BB trading pair composed of AA token and BB token cannot participate in Trading Mining.',
  miningTtile9:
    '2,Only when the trading account number of the trading pair is ≥10 can the Trading Mining be started. For example, if there are 10 accounts that trade AA with OEX, AA/OEX tradings will automatically participate in the Trading Mining; Only 9 accounts have traded BB with OEX, so BB/OEX trading pair cannot participate in Trading Mining. ',
  miningTtile10:
    '3,Each account number divides the OEX tokens output of each block according to its trading volume proportion, and the statistical unit of trading volume is OEX token. For example, if the total trading volume of OEXSWAP in a block are 10,000 OEX tokens and the trading volume of account A are 100 OEX tokens, account A can get 1% of the OEX tokens produced by the block, that are, 0.1 OEX tokens. ',
  miningTtile11:
    '4,The contract account of the OEXSWAP Trading Mining bonus pool is oexswapmierv01, and the initial bonus is 48600000 oex. When the block height reaches 15346888, the Trading Mining activities will automatically end. And all oex in the Trading Mining bonus pool will be transferred out from the oexliquidity account without additional issuance.',
  miningTtile12:
    "In addition, Hired Mining is launched, which means that you can get additional OEX rewards by hiring others to register through the hiring link. Hired Mining is divided into first-level Hired Mining (directly hired by this account) and second-level Hired Mining (indirectly hired by the account hired by this account). For the first-level hire, the employer can get 20% of the OEX of the first-level employee's transaction and mining as a hired rewards. And for the second-level hire, the employer can get the 10% OEX of the second-level employee's transaction and mining as the hired rewards. The Trading Mining rewards received by the hired will not be reduced, and the hired rewards come from the two level ",
  miningTtile13:
    ' "Hired Mining bonus pool". "The Level 1 Hired Mining Bonus Pool" is initially 9,720,000 OEX and "The Level 2 Hired Mining Bonus Pool" is initially 4,860,000 OEX. The contract account is swapspredv01. All OEX in the two level Hired Mining Bonus Pools are from the oexliquidity account without additional issuance.',
  miningTtile14:
    'For example, if A hires B to participate in Trading Mining, account A can not only get the rewards due to its own Trading Mining, but also get an additional 20% of the Trading Mining rewards of account B as its first-level Hired Mining rewards. The rewards for Trading Mining of account B remain unchanged, and the rewards for account A are paid out of the',
  miningTtile15:
    ' "first-level Hired Mining bonus pool". If B employs C after that, account B can receive an additional 20% of the Trading Mining rewards of account C as its first-level Hired Mining rewards, and account A can receive an additional 10% of the Trading Mining rewards of account C as its second-level mining rewards. The rewards obtained by accounts A and B are respectively paid from the two-level "Hired Mining bonus pool".',
  输入其它公钥: 'Enter another public key',
  资产: 'assets',
  合约: 'contract',
  挖矿: 'Mining',
  名称: 'name',
  提取: 'Extract',
  查询: 'Inquire',
  提交所有修改: 'Submit all edits',
  刷新: 'Refresh',
  取消: 'cancel',
  '取 消': 'Cancel',
  '确 定': 'Confirm',
  推广信息: 'Promotional information',
  您的推广链接: 'Your promotion link',
  个: 'pairs',
  普通交易所需阈值: 'Threshold for general trading',
  修改权限所需阈值: 'Threshold required to modify permissions',
  请在公链电报群中申请账号: 'Please apply for an account in the public chain telegram group.',
  请输入账号: 'Please input Username',
  账号格式错误: 'Account format error',
  '账号已存在，不可重复导入!': 'The account already exists and cannot be imported repeatedly!',
  账户不存在: 'Account does not exist',
  成功: 'success',
  失败: 'failure',
  无: 'no',
  查看: 'View',
  已复制到粘贴板: 'Copied to pasteboard',
  点击可复制: 'Click to copy',
  发送失败: 'Failed to send',
  尚未执行: 'Not yet executed',
  执行失败: 'Execution failed',
  执行成功: 'execution succeed',
  已回滚: 'Rolled back',
  不可逆: 'irreversible',
  可逆: 'Reversible',
  已确认区块数: 'Number of confirmed blocks',
  作为矿工: 'As a miner',
  资产的发行者: 'Issuer of assets',
  合约的发行者: 'Contract issuer',
  分到: 'get',
  设置: 'Setting',
  设置ABI: 'Set ABI',
  添加合约代码: 'Add Contract Code',
  解除绑定: 'Unbind',
  '资产/转账': 'Asset/Transfer',
  交易列表: 'Transactions',
  权限管理: 'Authority',
  手续费: 'Gas fee',
  未改变: 'Unchanged',
  新增: 'New',
  待删除: 'To be deleted',
  待修改: 'To be modified',
  删除: 'delete',
  修改: 'modify',
  重置: 'Reset',
  请选择公钥: 'Please select the public key',
  邮箱格式错误: 'Incorrect mailbox format',
  请选择创建者账号: 'Please select a creator account',
  '账号已存在，不可重复创建': 'The account already exists and cannot be created repeatedly',
  请选择或输入公钥: 'Please select or enter the public key',
  '无效公钥，请重新输入': 'Invalid public key, please re-enter',
  '附带转账金额数有误，请重新输入': 'The amount of the transfer amount is incorrect. Please re-enter',
  '输入的资产ID不存在，请检查后输入': 'The id of the transferred asset is incorrect. Please re-enter',
  '请输入有效的账号、公钥或地址': 'Please enter a valid account number, public key or address',
  账号不存在: 'Account does not exist',
  请输入权重: 'Please enter a weight',
  请选择手续费类型: 'Please select the fee type',
  请输入名称: 'Please enter a name',
  无手续费信息: 'No fee information',
  此资产创办者: 'Founder of this asset',
  可提取手续费: 'Can withdraw handling fee',
  此合约创办者: 'Founder of this contract',
  矿工: 'Miner',
  资产名: 'Asset name',
  合约账号: 'Contract account',
  矿工账号: 'Miner account',
  转账: 'Transfer',
  是: 'Yes',
  否: 'No',
  交易发送成功: 'Transaction sent successfully',
  交易发送失败: 'Transaction failed to send',
  目标账号不存在: 'Target account does not exist',
  请输入转账金额: 'Please enter the transfer amount',
  请输入正确的金额: 'Please enter the correct amount',
  余额不足: 'Insufficient balance',
  'ABI信息不符合规范，请检查后重新输入': 'ABI information does not meet the specifications, please check and re-enter',
  添加成功: 'Added successfully',
  请输入bytecode: 'Please enter the bytecode',
  账号: 'account number',
  创建者: 'Creator',
  权限交易阈值: 'Permission transaction threshold',
  普通交易阈值: 'General transaction threshold',
  区块高度: 'Block height',
  合约账户: 'Contract account',
  操作: 'operating',
  新增账户: 'Add',
  导入账户: 'Import',
  '首个主网账户请找第三方申请，如是首个测试网账户可上公链电报群(https://t.me/oexchainOfficial)进行申请，申请成功后请将私钥和账户导入即可使用。':
    'For the first main network account, please apply for a third party. If the first test network account can be applied to the public chain telegram group(https://t.me/oexchainOfficial), please import the private key and account after the application is successful.',
  账户创建: 'Account creation',
  '选择您拥有的账户(此账户用于创建新账户)': 'Choose the account',
  待创建账号: 'Account to be created',
  '由a-z0-9.组成，长度8~25位': 'Composed of a-z0-9., length 8~25',
  选择绑定本地已有公钥或在下面输入其它公钥: 'Choose to bind a local public key or enter another public key below',
  '如无公钥，请前往“账户管理”->“密钥”页面创建公私钥': 'Account Management -> Keys page to create key.',
  其它公钥: 'Other public key',
  '若此处填入公钥，创建时将以此公钥为准': 'Public key bound to account.',
  账号描述: 'Account description',
  '附带转账金额(单位': 'With transfer amount (unit',
  '创建新账号的同时，可向此账号转账，默认为0': 'Transfer token to the new account.',
  绑定新的权限拥有者: 'Bind a new permission owner',
  权限拥有者: 'Privilege owner',
  '可输入账户名/公钥/地址': 'Can enter account name / public key / address',
  权重: 'Weight',
  修改阈值: 'Modify threshold',
  选择阈值类型: 'Select threshold type',
  新阈值: 'New threshold',
  提取手续费: 'Withdrawal fee',
  选择手续费类型: 'Choose a fee type',
  '账号名/ID': 'Account name/ID',
  所有者: 'Owner',
  当前状态: 'Current state',
  绑定新权限: 'Bind new permissions',
  资产信息: 'Asset information',
  资产ID: 'Asset ID',
  资产符号: 'Asset symbol',
  可用金额: 'Amount Available',
  交易信息: 'Trading Information',
  时间: 'Time',
  哈希: 'hash',
  交易哈希: 'Trading Hash',
  交易状态: 'trading status',
  区块哈希: 'Block Hash',
  区块状态: 'Block status',
  内部交易: 'Internal transaction',
  类型: 'Types of',
  详情: 'Details',
  总手续费: 'Total handling fee',
  手续费分配详情: 'Fee allocation details',
  内部交易信息: 'Internal transaction information',
  类型: 'Type',
  // 发起账号: 'Initiate an account',
  接收账号: 'Receiving account',
  金额: 'Amount',
  额外信息: 'extra information',
  转账信息: 'Transfer information',
  收款账号: 'Collection account',
  本地添加合约ABI信息: 'Add contract ABI information locally',
  ABI信息: 'ABI information',
  设置合约byteCode: 'Set contract byteCode',
  合约byteCode: 'Contract byteCode',
  非助记词生成: 'Non-mnemonic generation',
  '钱包密码，由数字加字母组成，不少于8位': 'Numbers and letters, no less than 8 digits',
  通知: 'Notice',
  无密码可修改: 'No password to modify',
  导出私钥: 'Export private key',
  导出keystore: 'Export keystore',
  创建账户: 'Create Account',
  签名: 'Sign',
  '签名/验签': 'Sign/Check',
  导出助记词: 'Export mnemonic',
  '初始化钱包后才能使用此功能。': 'This feature is only available when the wallet is initialized.',
  无需再次初始化钱包: 'No need to initialize the wallet again',
  错误信息: 'Error message',
  不可重复添加密钥: 'Cannot add keys repeatedly',
  创建成功: 'Created successfully',
  '密码格式无效！': 'The password format is invalid!',
  '创建中...': 'Creating...',
  '导出中...': 'Exporting...',
  私钥信息: 'Private key information',
  助记词信息: 'Mnemonic information',
  KeyStore信息: 'KeyStore information',
  '删除中...': 'deleting...',
  密码验证中: 'Password verification',
  密码不一致: 'Two passwords are inconsistent, please re-enter',
  '新密码不一致，请重新输入': 'The new password is inconsistent, please re-enter',
  '原密码验证中...': 'Original password verification...',
  '原密码验证通过，开始修改密码...': 'The original password is verified and the password is changed...',
  '更新文件中...': 'Update file...',
  '无效私钥！': 'Invalid private key!',
  开始导入: 'Start importing',
  导入成功: 'Successfully imported',
  '请输入12个助记词，以空格隔开！': 'Please enter 12 mnemonics separated by spaces!',
  助记词路径必须以: 'The mnemonic path must be',
  '开头！': 'beginning!',
  '密码必须由数字加字母组成，不少于8位': 'Password must be no less than 8 digits which composed of numbers and letters',
  'Keystore信息及其密码不能为空！': 'Keystore information and password cannot be empty!',
  '开始导入...': 'Start importing...',
  输入有误: 'Enter the error information',
  下一步: 'Next step',
  上一步: 'Previous step',
  获取签名: 'obtain signature',
  公钥: 'Public key',
  地址: 'Address',
  生成路径: 'Generating path',
  操作: 'Operate',
  '初始化钱包/新增一对公私钥': 'Initialize / Add key',
  通过导入助记词初始化钱包: 'Initialize by importing mnemonics',
  直接导入私钥: 'Import private key',
  通过keystore导入私钥: 'Import keystore',
  修改密码: 'Change Password',
  输入密码: 'Enter password',
  密码: 'password',
  旧密码: 'Old password',
  新密码: 'New password',
  密码确认: 'Password confirmation',
  新密码确认: 'Password confirmation',
  导入私钥: 'Import private key',
  私钥: 'Private key',
  需包含0x前缀: 'Must contain a 0x prefix',
  导入助记词: 'Import mnemonic',
  助记词: 'Mnemonic',
  '输入助记词，用空格隔开': 'Enter mnemonics separated by spaces',
  助记词生成路径: 'Mnemonic generating path',
  '密码将作为钱包密码，由数字加字母组成，不少于8位': 'The password will be used as the wallet password, consisting of no less than 8 digits with numbers and letters.',
  导入Keystore信息: 'Import keystore information',
  '此密码为keystore绑定密码，非本地钱包密码': 'This password is the keystore binding password but not the local wallet password.',
  '此Keystore信息导入后，将会由本地钱包重新加密成新的keystore保存，但私钥会保持一致':
    'A new keystore will be re-encrypted by the local wallet after the keystore information is imported, while the private key will remain the same.',
  请按序输入上一步显示的助记词: 'Enter the mnemonic',
  签名交易: 'Signature transaction',
  签名结果: 'Signature result',
  最新区块: 'Latest block',
  最新区块高度: 'Latest block height',
  不可逆区块高度: 'Irreversible block height',
  交易信息: 'Transaction',
  两轮出块周期内最高TPS: 'Highest TPS in two block-generating cycles',
  最近两轮的交易数: 'The transaction numbers in the last two cycles',
  生产者: 'Producer',
  注册为生产者的节点数量: 'Number of candidate',
  出块节点数量: 'Number of miner',
  投票数: 'Number of votes',
  总投出的票数: 'Total number of votes casted',
  出块节点获得的总票数: 'Total votes of miners',
  区块: 'Block',
  高度: 'Height',
  交易数: 'Transaction numbers',
  Gas消耗: 'Gas used',
  '区块大小(B)': 'Block size (B)',
  区块哈希值: 'Block hash ',
  '注意：此区块已被回滚': 'Note: This block has been rolled back',
  区块不存在: 'Block does not exist',
  区块信息: 'Block information',
  不可逆高度: 'Irreversible height',
  时间戳: 'Timestamp',
  父区块哈希: 'Parent block hash',
  大小: 'Size',
  无法获取到交易信息: 'Unable to get transaction information',
  请输入十六进制的哈希值: 'Please enter a hexadecimal hash ',
  交易哈希: 'Transaction hash',
  交易原始信息: 'Original transaction information',
  交易Receipt信息: 'Transaction Receipt Information',
  资产的发行者: 'Assets issuer',
  发起账户: 'Initiating account',
  类型: 'Types ',
  结果: 'Result',
  总手续费: 'Total fee',
  发起账号: 'Account',
  资产1: 'Asset 1',
  资产2: 'Asset 2',
  添加流动性: 'add liquidity',
  移除流动性: 'quit liquidity',
  当前周期: 'Current Epoch',
  当前区块高度: 'Current block height',
  当前区块奖励: 'Current block reward',
  我的挖矿奖励: 'My mining reward',
  一级邀请: 'Level 1 invitation',
  二级邀请: 'Level 2 invitation',
  '一、二级雇佣奖励': 'Total Employment Reward',
  提取奖励: 'Withdrawal reward',
  复制邀请链接: 'Copy invitation link',
  提取挖矿奖励: 'Withdraw the mining reward',
  'OEXSWAP 交易对创建规则': 'Rules for Creating OEXSWAP Trading Pairs',
  选择资产: 'Select ASSET',
  敬请期待: 'Coming soon...',
  选择此资产: 'Select the asset',
  '持有账户数:': 'Accounts held：',
  '流动性/个': 'Pairs',
  退出流动池: 'quit',
  '通过资产ID/资产全名搜索资产': 'Search for assets by asset ID/ asset full name',
  额外信息: 'Additional information',
  选择交易发送方: 'Select the transaction sender',
  选择需要对交易进行签名的账户: 'Select the account that needs to sign the transaction',
  '内部错误：未传入交易账户信息': "Inner error：transaction account info hasn't been passed in.",
  请输入GAS单价: 'Please input the gas price.',
  请输入愿意支付的最多GAS数量: 'Please input gas limit.',
  请输入钱包密码: 'Please input wallet password.',
  余额不足以支付gas费用: "Balance can't pay the gas fee.",
  余额不足: 'Balance is too low.',
  权限阈值: 'authority threshold',
  交易发送失败: 'transaction send failed',
  开始发送交易: 'start to send transaction',
  交易发送成功: 'success to send transaction',
  交易发送失败: 'fail to send transaction',
  开始计算签名: 'start to compute the signature',
  验证通过: 'verify success',
  验证失败: 'verify fail',
  自己签名: 'sign by self',
  验证签名: 'verify signature',
  交易确认: 'transaction confirmation',
  建议值: 'suggestion value',
  GAS数量上限: 'gas limit',
  备注信息: 'comment info',
  钱包密码: 'wallet password',
  获取多签名数据: 'get multisignature data',
  待签名的交易内容: 'transaction content to be signed',
  请选择需要对本交易进行签名的各方: 'Please select who will sign the transaction',
  请选择需要操作资产的账户: 'Please select account which will operate asset',
  请选择需要更新关联合约的资产ID: 'Please select asset id which will bind to contract',
  合约账户不存在: " Contract account isn't exist.",
  需改变创办者的资产: 'Asset',
  需改变合约的资产: 'Asset',
  置空则为非协议资产: 'non contract asset could be set to null',
  提交: 'submit',
  请输入待销毁资产金额: 'Please input value of asset destroyed',
  销毁金额不能超过您所拥有的资产总额: "the destroyed value of asset can't beyond your total asset balance.",
  需销毁的资产: 'Asset',
  销毁金额: 'destroyed value',
  销毁说明: 'destroy comment',
  请输入创办者的账户名称: "Please input account founder's account name.",
  创办者不存在: "founder isn't exist",
  创办者: 'founder',
  请输入大于0的增发金额: 'please input the value bigger than 0',
  已超过可增发的总金额: 'beyond the upperlimit',
  已超过可发行的上限: 'beyond the upperlimit',
  请输入增发对象的账户名称: 'Please input account name',
  增发对象不存在: 'account not exist',
  待增发资产: 'Asset',
  选择需要增发的资产ID: 'Please select asset',
  增发金额: 'value',
  增发对象: 'account',
  将资产增发给此账号: 'increase asset to account',
  资产名称错误: 'asset name is error',
  资产已存在: 'asset has been exist',
  '资产名同账号名冲突，不可用': 'asset name conflict with account name',
  '由于父资产的管理者不属于此账户，因此无法创建此子资产': "Can't create sub asset",
  资产符号错误: 'asset symbol is error',
  资产金额必须大于0: 'asset value must be bigger than 0',
  请输入正确的精度: 'Please input correct decimals',
  管理者账户不存在: 'manager account not exist',
  创办者不存在: 'founder not exist',
  资产上限必须大于等于资产发行金额: 'asset upper limit should bigger than issue value',
  请输入正确的资产名称: 'please input correct asset name',
  不可跟已有的资产和账户名冲突: 'name conflict',
  请输入正确的资产符号: 'input correct asset symbol',
  符号: 'symbol',
  'a~z、0~9.组成，2-16位': 'a~z,0~9,2~16Bytes',
  'a~z、0~9组成，2-16位': 'a~z,0~9,2~16Bytes',
  请输入正确金额: 'Please input correct value',
  金额: 'value',
  请输入正确精度: 'Please input correct decimals',
  精度: 'decimals',
  管理者: 'manager',
  可对此资产进行管理: 'can manage the asset',
  可收取相关手续费: 'can get gas fee',
  增发上限: 'upper limit of increase asset',
  '资产增发上限,0表示无上限': 'upper limit,0 is limitless',
  留空表示非协议资产: 'null is not contract asset',
  资产描述: 'asset description',
  资产操作: 'asset operate',
  选择发起资产操作的账户: 'select account to operate asset',
  发行资产: 'Issue Asset',
  增发资产: 'Increate Asset',
  设置资产管理者: 'Set Asset Manager',
  设置资产创办者: 'Set Asset Founder',
  设置协议资产: 'Set Contract Asset',
  销毁资产: 'Destroy Asset',
  请选择需要操作资产的账户: 'Please select account to operate asset',
  请选择需要改变管理者的资产ID: 'Please select asset id',
  请输入管理者的账户名称: 'Please input manager account name',
  管理者不存在: 'manager not exist',
  需改变管理者的资产: 'Asset',
  无此账户信息: 'no account info',
  无此资产信息: 'no asset info',
  用户资产信息: 'User Asset Info',
  用户账号: 'user account',
  资产发行信息: 'Asset Issue Info',
  '资产ID/资产名称': 'asset id/name',
  创建区块高度: 'block height',
  已发行量: 'issued value',
  创建人: 'founder',
  增发量: 'increase value',
  资产上限: 'asset upper limit',
  描述: 'description',
  请选择需要投票的候选者账号: "Please select candidate's account",
  请选择投票账户: 'Please select vote account',
  请输入有效的投票数: 'Please input valid vote ticket',
  请选择注册账户: 'Please select account',
  请输入有效的抵押票数: 'Please input valid guaranty deposit',
  请选择需要更新的候选者账号: 'Please select candidate account',
  最多可增加的抵押票数: 'most increased guaranty deposit',
  新增抵押票数不可超过最大可抵押票数: 'guaranty deposit to be added is too much',
  请选择需要注销的候选者账号: 'Please select candidate account to be unregistered',
  请选择已注销的候选者账号: 'Please select candidate account which has been unregistered',
  '当前周期无法提取抵押金，还需': "can't refund guaranty deposit in this epoch, need",
  个周期后才能提取: 'extra epoch to refund',
  最大可投票数: 'most votable tickets',
  '此账户无足够抵押票数，不可申请候选者，最低抵押票数为': 'not enough tickets to register candidate, the minimum ticket num is',
  '<= 可抵押票数 <=': '<= guarantable tickets <=',
  出块率: 'block rate',
  正常: 'normal',
  兑换: 'swap',
  资金池: 'LIQUIDITY',
  添加资金池: 'ADD LIQUIDITY',
  '余额：': 'BALANCE：',
  '资产ID：': 'Asset ID：',
  '可接受的最大滑点：': 'Slippage tolerance：',
  '兑换手续费：': 'Transaction fee：',
  '您的流动性占比：': 'Liquidity proportion：',
  自定义: 'Customize',
  资金池详情: 'Market Detail',
  我的做市: 'My Liquidity',
  所有交易对: 'Total pairs ',
  交易记录: 'Transaction record ',
  挖矿信息: 'Mining info ',
  当前资金池流动性总量: 'Total liquidity of current pool',
  流动池数量: 'Liquidity',
  我的资金池: 'My liquidity',
  占比: 'Ratio ',
  退出流动性: 'Quit',
  开始交易: 'TRAGE',
  交易对: 'PAIRS',
  当前流通量: 'CURRENT LIQUIDITY',
  总交易量: 'TOTAL LIQUIDITY',
  交易时间: 'Trading time',
  交易哈希值: 'Transaction hash value',
  操作类型: 'Operation',
  // '兑换手续费：': '',
  // '兑换手续费：': '',
  // '兑换手续费：': '',
  // '兑换手续费：': '',
  // '兑换手续费：': '',
  // '兑换手续费：': '',
  // '兑换手续费：': '',
  // '兑换手续费：': '',
  '已注销，尚未提取抵押金': 'unregistered, not refund',
  所在周期: 'epoch',
  我的投票账户: 'my vote account',
  投票数: 'Vote Amount',
  投: 'vote',
  票: 'ticket',
  投票: 'vote ticket',
  注册候选者: 'register candidate',
  更新候选者: 'update candidate',
  注销候选者: 'unregister candidate',
  取回抵押金: 'refund guaranty deposit',
  当前周期: 'current epoch',
  一个周期时长: 'one epoch duration',
  候选者账号: 'Candidate',
  状态: 'Status',
  抵押票数: 'guaranty tickets',
  总投票数: 'Total Vote',
  最近一次操作的区块高度: 'latest operate height',
  实出块数: 'Actual Number',
  应出块数: 'Theory Number',
  我的投票: 'my vote',
  可出块节点: 'mineable node',
  正在出块的节点: 'mining node',
  我的节点: 'my node',
  备选节点: 'alternative node',
  合约编辑器: 'contract editor',
  选择您可投票的账户: 'select votable account',
  选择待注册为候选者的账户: 'select account to be register candidate',
  'URL(可选)': 'URL(optional)',
  抵押票数: 'Guarantee Vote',
  增加抵押票数: 'add guarantee vote amount',
  发布: 'launch',
  编译: 'Compile',
  'ABI信息不符合规范，请检查后重新输入': 'ABI information is not correct',
  请选择发起合约调用的账号: 'Please select account to call contract',
  请输入合约账号名: 'Please input contract account name',
  '合约不存在，请检查合约名是否输入错误': 'contract not exist',
  参数: 'parameter',
  尚未输入值: 'no input value',
  查询结果: 'require result',
  发起合约交易: 'send contract transaction',
  附带转账: 'attached transfer',
  转账资产ID: 'transfer asset id',
  转账资产金额: 'transfer asset amount',
  查询交易: 'require transaction',
  查询Receipt: 'require receipt',
  '交易/Receipt信息': 'transaction/receipt info',
  '非交易哈希，无法查询': 'not transaction hash',
  'Receipt表明本次交易执行失败，原因': ' transaction execute fail, reason',
  '账号未保存ABI信息，无法导入': "account not save abi info, can't be imported",
  选择发起合约调用的账户: 'select account to call contract',
  ABI信息: 'ABI Information',
  导入ABI: 'Import ABI',
  解析ABI: 'Parse ABI',
  概览: 'Overview',
  账户管理: 'Account Manager',
  密钥: 'Keys',
  账号: 'Accounts',
  '区块 & 交易查询': 'Block&Transaction',
  交易: 'Transaction',
  资产管理: 'Asset Manager',
  资产搜索: 'Asset Search',
  资产操作: 'Asset Operator',
  候选者列表: 'Candidate List',
  开发者: 'Developer',
  合约调用: 'Contract Call',
  原始交易构造: 'Raw Transaction',
  自动化测试: 'AutoTest',
  设置节点: 'Set Node',
  中文: 'Chinese',
  英文: 'English',
  当前连接的节点: 'Node in connection',
  邀请奖励: 'invitation Reward',
  配置节点: 'Node Configure',
  最新区块的TPS: 'TPS of latest block',
  最新区块的交易量: 'Txns of latest block',
  '请升级浏览器，当前浏览器无法保存交易结果': 'Please upgrade your browser, otherwise it will not work fine.',
  向: '->',
  新账号收到转账: 'new account receives transfe',
  初始发行金额: 'original amount',
  发行上限: 'issue upper limit',
  创办者账号: 'founder account',
  管理者账号: 'manager account',
  天: 'days',
  小时: 'hours',
  分: 'minutes',
  秒: 'seconds',
  无法连接节点: "Can't connect to the node",
  选择ChainId: 'Select ChainId',
  请选择ChainId: 'Please select ChainId',
  '无法连接节点，请手动选择chainId才能加载密钥': "Can't connect node, please select the chaindId to load keys.",
  父子资产的精度必须保持一致: 'The decimals of father and sub asset should be equal.',
  '加密/解密': 'Encrypt/Decrypt',
  加密: 'encrypt',
  解密: 'decrypt',
  '签名/验签交易': 'Sign/Verify Tx',
  验证签名时可填写: 'Input when verify sign',
  '加/解密信息': 'Encrypt/Decrypt Info',
  '加/解密结果': 'Encrypt/Decrypt Result',
  待比较地址: 'Address to be compared',
  父资产不存在: 'Father asset is not exist',
  账号设置: 'Account',
  设置接入节点: 'Node Setting',
  '主网：': 'Mainnet:',
  '主网1：': 'Mainnet 1:',
  '主网2：': 'Mainnet 2:',
  '测试网1：': 'Testnnet1:',
  '测试网2：': 'Testnnet2:',
  '本地节点：': 'Local Node',
  // 自定义: 'Customization',
  实时数据: 'Latest Data',
  区块查询: 'Block Info',
  交易查询: 'Tx Info',
  合约开发: 'Contract',
  主网: 'MainNet',
  测试网: 'TestNet',
  私网: 'Private Net',
  资产: 'Asset',
  '格式：‘账户名:资产名’': 'format: ‘accountName:assetName’',
  最近一次DPOS相关操作的区块高度: 'Lastest Action',
  总出块数: 'total blocks',
  总出块率: 'rate of mined block',
  本周期出块数: 'block number of current epoch',
  本周期出块率: 'block rate of current epoch',
  总应出块数: 'total block number',
  本周期应出块数: 'total block number of current epoch',
  抵押票数固定为50万OEX: 'please input 500000 OEX',
  添加合约: 'Add Contract',
  删除选中合约: 'Delete Contract',
  我的合约: 'My Contracts',
  '公共库(可直接调用)': 'Public Libs',
  '示例(仅供参考)': 'Sample Code',
  复制: 'Copy',
  部署: 'Deploy',
  加载: 'Load',
  发起交易账户: 'account for sending tx',
  请选择待编译文件: 'select file to be compiled',
  请选择合约: 'select contract',
  查看合约ABI: 'Show Contract ABI',
  查看合约BIN: 'Show Contract BIN',
  请输入合约文件名称: 'Input contract file name',
  合约文件名: 'file name',
  合约ABI信息: 'Contract ABI',
  合约BIN信息: 'Contract BIN',
  复制ABI: 'Copy ABI',
  复制BIN: 'Copy BIN',
  请输入合约账号: 'Please input contract account',
  ' 编译结果': 'compile result',
  '合约 ': 'contract',
  编号: 'No',
  '编号:': 'No:',
  '合约账号:': 'Contract Account',
  '合约名:': 'Contract name',
  '创建时间:': 'Create time',
  未记录: 'No record',
  '只读类接口:': 'Readonly interface',
  '写入类接口:': 'Writable interface',
  '写入并可支付类接口:': 'Payable interface',
  '交易信息:': 'Tx Info',
  'Receipt信息:': 'Receipt Info',
  创建时区块高度: 'Created block Height',
  操作: 'Operate',
  合约账户名: 'Contract Account',
  转账金额: 'Transfer Amount',
  GAS单价: 'Gas Price',
  请输入合约账户名: 'Please input contract account name',
  请输入GAS单价: 'Please input gas price',
  请输入愿意支付的最多GAS数量: 'Please input gas limit',

  无此合约编译信息: 'No compile info of this contract',
  '数组类型的值请按如下格式填写:': 'The input format of array type:',
  开始部署合约: 'Begin to deploy contract',
  'OEX余额不足，无法发起交易': 'Amount of OEX is not enough, can not send tx',
  '部署合约的交易哈希:': 'the tx hash of deploying contract',
  部署合约: 'Deploy Contract',
  成功部署合约: 'Success to deploy contract',
  '部署合约交易发送失败:': 'Fail to send tx of deploying contract',
  请输入合约账户的公钥: 'Please select public key of contract account',
  请输入OEX转账金额: 'Please input amount of transferring OEX token',
  '创建账户的交易哈希:': 'the tx hash of creating account',
  '合约账户创建成功，即将为账户添加合约代码': 'Success to create contract account, next to add contract code for the account',
  '合约账户已创建，可部署合约': 'Contract account has been created, and contract code could be deployed',
  开发者Wiki: 'Wiki for developer',
  配置需连接的节点: 'Node Configure',
  区块原始信息: 'Block',
  'zh-cn': 'en-us',
  '字母开头,由a-z0-9组成,12~16位': 'Letter beginning, a-z0-9, 12-16 characters',
  '附带转账金额(单位:OEX)': 'Transfer Amount(OEX)',
  '交易确认-': 'Transaction Confirmation-',
  '节点信息(可选)': 'Node Info',
  账户信息: 'Account Info',
  密钥信息: 'Key Info',
  条交易: ' txns',
  发生于: ' at ',
  块龄: 'Time',
  用户资产信息查询: 'User Asset Info',
  资产发行信息查询: 'Asset Issue Info',
  账户名: 'Account',
  资产描述: 'Asset Description',
  确定: 'OK',
  '高度/哈希': 'height/hash',
  账号信息: 'Account Info',
  账号名: 'Account Name',
  当前账号: 'Current Account',
  下载合约: 'Download Contract',
  编译合约: 'Compile Contract',
};
const cnConf = {
  miningText1: 'token的链上持有账户地址数≥100方可创建包含该token的交易对。例如，持有AA token的链上账户有100个，则可成功创建AA/OEX交易对；持有BB token的链上账户只有99个，则无法创建BB/OEX交易对。',
  miningTtile2: 'OEXSWAP 交易挖矿每个区块初始产出10个OEX，每90天为一个减半周期，共减半三次，每个周期出2,592,000个块。',
  miningTtile3: '周期1：从区块高度4,978,888开始，每个区块产出10个OEX，计划产出25,920,000个OEX。',
  miningTtile4: '周期2：从区块高度7,570,888开始，每个区块产出5个OEX，计划产出12,960,000个OEX。',
  miningTtile5: '周期3：从区块高度10,162,888开始，每个区块产出2.5个OEX，计划产出6,480,000个OEX。',
  miningTtile6: '周期4：从区块高度12,754,888开始，每个区块产出1.25个OEX，计划产出3,240,000个OEX。',
  miningTtile7: '交易挖矿持续时间360天，计划产出48,600,000个OEX。',
  miningTtile8: '1.参与交易挖矿的交易对必须以OEX为锚。例如，AA token与OEX token组成的AA/OEX交易对可参与交易挖矿；而AA token与BB token组成的AA/BB交易对无法参与交易挖矿。',
  miningTtile9: '2.该交易对的交易账号数≥10方能启动交易挖矿。例如，有10个账户用OEX交易了AA，则AA/OEX交易对自动参与交易挖矿；只有9个账户用OEX交易了BB，则BB/OEX交易对无法参与交易挖矿。',
  miningTtile10:
    '3.每个账号按其交易量占比瓜分每个区块产出的OEX，交易量统计单位为OEX。例如，某区块产出的时间段内OEXSWAP总交易量为10,000个OEX，A账户交易量为100个OEX，则A账户可分得该区块产出的OEX的1%，即可分得0.1个OEX。',
  miningTtile11:
    '4.交易挖矿奖金池合约账户为oexswapmierv01，奖金初始为48,600,000个OEX，达到区块高度15,346,888时交易挖矿活动自动结束，交易挖矿奖金池中所有OEX从oexliquidity账户（OEX流动性账户）转出，不额外增发。',
  miningTtile12:
    '此外，再推出雇佣挖矿，即通过雇佣链接雇佣他人注册可额外获得OEX奖励。雇佣挖矿分为一级雇佣挖矿（本账户直接雇佣）和二级雇佣挖矿（本账户雇佣的账户所间接雇佣）。一级雇佣，雇佣者可获得一级被雇佣者交易挖矿的20%的OEX作为雇佣奖励；二级雇佣，雇佣者可获得二级被雇佣者交易挖矿的10%的OEX作为雇佣奖励。注意，被雇佣者所获交易挖矿奖励不会减少，雇佣奖励来自',
  miningTtile13:
    '“雇佣挖矿奖金池”，其中“一级雇佣挖矿奖金池”初始为9,720,000个OEX；“二级雇佣挖矿奖金池”初始为4,860,000个OEX，合约账户为swapspreadv01。雇佣挖矿奖金池中所有OEX从oexliquidity账户（OEX流动性账户）转出，不额外增发。',
  miningTtile14:
    '例如，A雇佣B参与交易挖矿，A账户除了可以获得自己交易挖矿应得的奖励，还可以额外获得B账户交易挖矿奖励的20%作为其一级雇佣挖矿奖励，且B账户所获交易挖矿奖励不变，A账户所获奖励从“一级雇佣挖矿奖金池”中支出。如果B又雇佣了C，则B账户可额外获得C账户交易挖矿奖励的20%作为其一级雇佣挖矿奖励，且A账户可额外获得C账户交易挖矿奖励的10%作为其二级雇佣挖矿奖励，A、B账户所获奖励分别从两级“雇佣挖矿奖金池”中支出。',
};
let isCh = true;

function T(chStr) {
  if (isCh) {
    if (cnConf[chStr]) return cnConf[chStr];
    return chStr;
  }
  if (ch2en[chStr] != null) return ch2en[chStr];
  console.log('no en:' + chStr);
  return chStr;
}

function setLang(lang) {
  if (lang == 'ch') {
    isCh = true;
  } else if (lang == 'en') {
    isCh = false;
  }
}

function TUP(chStr) {
  const res = T(chStr);
  if (typeof res === 'string') return T(chStr).toLocaleUpperCase();
  return res;
}

export { T, setLang, TUP };
