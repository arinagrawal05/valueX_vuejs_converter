// Import the Line component from vue-chartjs for rendering line charts in Vue components
import { Line } from 'vue-chartjs'
// Import necessary chart components and elements from Chart.js
import {
  Chart as ChartJS,     // Main Chart.js object for creating charts
  Title,              // Component for adding titles to the chart
  Tooltip,           // Component for displaying tooltips on hover
  Legend,             // Component for displaying a chart legend
  LineElement,        // Element representing the line in a line chart
  CategoryScale,      // Scale for the x-axis that supports category data
  LinearScale,        // Scale for the y-axis to handle linear data
  PointElement,       // Element representing data points in the chart
  Filler,             // Plugin to enable filling the area under the line
} from 'chart.js'

// Register the imported Chart.js components with the ChartJS object.
// This step is necessary to activate these features within the Chart.js library.
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
)
// Export the Line component as the default export so it can be used in other parts of the application.
export default Line
