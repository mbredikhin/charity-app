import * as pt from 'prop-types';

export const RequestType = pt.exact({
  id: pt.string,
  title: pt.string,
  organization: pt.exact({
    title: pt.string,
    isVerified: pt.bool,
  }),
  description: pt.string,
  goalDescription: pt.string,
  actionsSchedule: pt.arrayOf(
    pt.exact({
      stepLabel: pt.string,
      isDone: pt.bool,
    })
  ),
  endingDate: pt.string,
  location: pt.exact({
    latitude: pt.number,
    longitude: pt.number,
    district: pt.string,
    city: pt.string,
  }),
  contacts: pt.exact({
    email: pt.string,
    phone: pt.string,
    website: pt.string,
  }),
  requesterType: pt.oneOf(['person', 'organization']),
  helpType: pt.oneOf(['finance', 'material']),
  helperRequirements: pt.exact({
    helperType: pt.oneOf(['group', 'single']),
    isOnline: pt.bool,
    qualification: pt.oneOf(['professional', 'common']),
  }),
  contributorsCount: pt.number,
  requestGoal: pt.number,
  requestGoalCurrentValue: pt.number,
});
