export const test_Data = {
  listOfObjects: [{ item: 'object_1' }],
  objectOfLists: { list_1: [{ item: 'object_1' }] } as Record<string, unknown[]>,
  mapOfObjects: new Map<string, { item: string }>([['object_1', { item: 'object_1' }]]),
  objectOfPrimitives: {
    int: 1,
    bool: true,
    lost: undefined as unknown,
    text: 'primitive_1',
  },
  objectOfObjects: {
    object_1: { item: 'object_1' },
    object_2: { item: 'object_2' },
  },
};

export const test_DataPaths = {
  listOfObjects: [{ item: 'object_1' }],
  'objectOfLists.list_1': [{ item: 'object_1' }],
  mapOfObjects: new Map<string, { item: string }>([['object_1', { item: 'object_1' }]]),
  'objectOfPrimitives.int': 1,
  'objectOfPrimitives.bool': true,
  'objectOfPrimitives.lost': undefined,
  'objectOfPrimitives.text': 'primitive_1',
  'objectOfObjects.object_1.item': 'object_1',
  'objectOfObjects.object_2.item': 'object_2',
};
