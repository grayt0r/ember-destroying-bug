import Model, { attr, belongsTo } from '@ember-data/model';

export default class ParentModel extends Model {
  @attr() name;

  @belongsTo('child', { async: false }) child;
}
