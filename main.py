from flask import Flask, jsonify, request
import pandas as pd
from prophet import Prophet
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predictions', methods=['POST'])
def get_predictions():
    try:
        # Get data from the request JSON
        request_data = request.get_json()
        print("Received Request Data:", request_data)
        # Assuming the request data has a 'sales' key with an array of sales data
        sales_array = request_data.get('sales', [])

        # Convert the sales_array to a DataFrame
        sales_df = pd.DataFrame(sales_array)
        sales_df = sales_df.rename(columns={'date': 'ds', 'profit': 'y'})

        # Create and fit the Prophet model
        model = Prophet(changepoint_prior_scale=0.05)  # Adjust the value as needed
        model.fit(sales_df)

        # Create a DataFrame for the next month's dates
        future = model.make_future_dataframe(periods=30, freq='D')

        # Make predictions for the future dates
        forecast = model.predict(future)

        # Extract the predicted values for the next month
        next_month_predictions = forecast.tail(30)[['ds', 'yhat']]

        # Convert predictions to a dictionary
        predictions_dict = next_month_predictions.to_dict(orient='records')

        return jsonify(predictions_dict)

    except Exception as e:
        error_message = f"Error processing request: {str(e)}"
        print(error_message)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
