import {connect} from "react-redux"
import Counter from "../components/counter"
import {
  countUp,
  countDown
} from "../actions";

const mapStateToProps = (state) => {
  return {
    count: state.count.count
  }
};

const mapDispatchProps = (dispatch) => {
  return {
    onClickCountUp: () => dispatch(countUp()),
    onClickCountDown: () => dispatch(countDown()),
  }
};

export default connect(
    mapStateToProps,
    mapDispatchProps,
)(Counter)

