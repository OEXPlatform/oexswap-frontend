/**
 * 全局数据管理中心。
 * 数据变更会发送事件，外部自行监听/获取
 */
import eventProxy from '../utils/eventProxy';
import { sleep } from '../utils/notification';
import * as oexchain from 'oex-web3';

class AppDataClass {
  CurrentBlock = {
    difficulty: 0,
    extraData: '',
    forkID: { cur: 0, next: 0 },
    gasLimit: 0,
    gasUsed: 0,
    hash: '',
    miner: '',
    number: 0,
    parentHash: '',
    proposedIrreversible: 0,
    receiptsRoot: '',
    reward: 0,
    size: 0,
    stateRoot: '',
    timestamp: 0,
    totalDifficulty: 0,
    transactions: [],
    transactionsRoot: '',
  };

  NextValidCandidates = {
    activatedCandidateSchedule: [],
    activatedTotalQuantity: 0,
    badCandidateIndexSchedule: [],
    dpos: true,
    epoch: 0,
    number: 0,
    preEpoch: 0,
    takeOver: false,
    totalQuantity: 0,
    usingCandidateIndexSchedule: [],
  };

  constructor() {
    this.mounted = Promise.all([this._updateCurrentBlock(), this._updateEpoch()]);
  }

  async awaitOex() {
    return oexchain.oex.getChainConfig(false);
  }

  async _updateCurrentBlock() {
    // await this.awaitOex();
    try {
      this.CurrentBlock = await oexchain.oex.getCurrentBlock();
      eventProxy.trigger('AppData:CurrentBlock', this.CurrentBlock);
      sleep(3000).then(() => this._updateCurrentBlock());
    } catch (e) {
      console.error(e);
      await sleep(3000); // 3秒
      return this._updateCurrentBlock();
    }
  }

  async _updateEpoch() {
    // await this.awaitOex();
    try {
      this.NextValidCandidates = await oexchain.dpos.getNextValidCandidates();
      eventProxy.trigger('AppData:NextValidCandidates', this.NextValidCandidates);
    } catch (e) {
      console.error(e);
      await sleep(3000); // 3秒
      return this._updateEpoch();
    }
  }
}

export const AppData = new AppDataClass();
