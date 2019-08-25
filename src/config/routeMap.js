const routeMap = {
  '/plan/:id': {
    action: 'reset',
    name: 'Plan',
  },
  '/profile': {
    action: 'reset',
    name: 'My Profile',
  },
  '/message': {
    action: 'reset',
    name: 'Messages',
  },
  '/notifications': {
    action: 'reset',
    name: 'Notifications',
  },
  '/profile/points': {
    action: 'push',
    name: 'Points Summary',
  },
};

export default routeMap;