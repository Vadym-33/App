import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import styles from '../../../styles/styles';
import ReportActionItemFragment from './ReportActionItemFragment';
import reportActionPropTypes from './reportActionPropTypes';
import {withNetwork} from '../../../components/OnyxProvider';
import ExpensifyText from '../../../components/ExpensifyText';
import * as Localize from '../../../libs/Localize';
import themeColors from '../../../styles/themes/default';
import * as ReportUtils from '../../../libs/reportUtils';

const propTypes = {
    /** The report action */
    action: PropTypes.shape(reportActionPropTypes).isRequired,

    /** Information about the network */
    network: PropTypes.shape({
        /** Is the network currently offline or not */
        isOffline: PropTypes.bool,
    }),
};

const defaultProps = {
    network: {isOffline: false},
};

const ReportActionItemMessage = (props) => {
    const isUnsent = props.network.isOffline && props.action.loading;
    const isDeleted = ReportUtils.isDeletedAction(props.action);

    return (
        <View style={[styles.chatItemMessage, isUnsent && styles.chatItemUnsentMessage]}>
            {isDeleted
                ? <ExpensifyText color={themeColors.textSupporting}>{`[${Localize.translateLocal('common.deletedCommentMessage')}]`}</ExpensifyText>
                : _.map(_.compact(props.action.message), (fragment, index) => (
                    <ReportActionItemFragment
                            key={`actionFragment-${props.action.sequenceNumber}-${index}`}
                            fragment={fragment}
                            isAttachment={props.action.isAttachment}
                            loading={props.action.loading}
                    />
                ))}
        </View>
    );
};

ReportActionItemMessage.propTypes = propTypes;
ReportActionItemMessage.defaultProps = defaultProps;
ReportActionItemMessage.displayName = 'ReportActionItemMessage';

export default withNetwork()(ReportActionItemMessage);
