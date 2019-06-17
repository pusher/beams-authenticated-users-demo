package com.pusher.demo.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.pusher.pushnotifications.BeamsCallback
import com.pusher.pushnotifications.PushNotifications
import com.pusher.pushnotifications.PusherCallbackError
import com.pusher.pushnotifications.auth.AuthData
import com.pusher.pushnotifications.auth.AuthDataGetter
import com.pusher.pushnotifications.auth.BeamsTokenProvider

class MainActivity : AppCompatActivity() {

    private val INSTANCE_ID = "XXX"
    private val AUTH_URL = "http://192.168.6.27:3000/auth"
    //this should be your laptops ip address, followed by a colon
    // followed by the port your npm server is running on
    //e.g. http://192.168.6.27:3000/auth


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        PushNotifications.start(applicationContext, INSTANCE_ID)

        PushNotifications.addDeviceInterest("donuts")

        val tokenProvider = BeamsTokenProvider(
            AUTH_URL,
            object: AuthDataGetter {
                override fun getAuthData(): AuthData {
                    return AuthData(
                        // Headers and URL query params your auth endpoint needs to
                        // request a Beams Token for a given user
                        headers = hashMapOf(
                            // for example:
                            // "Authorization" to sessionToken
                        ),
                        queryParams = hashMapOf()
                    )
                }
            }
        )

        PushNotifications.setUserId(
            "danielle",
            tokenProvider,
            object : BeamsCallback<Void, PusherCallbackError> {
                override fun onFailure(error: PusherCallbackError) {
                    Log.e("BeamsAuth", "Could not login to Beams: ${error.message}");
                }

                override fun onSuccess(vararg values: Void) {
                    Log.i("BeamsAuth", "Beams login success");
                }
            }
        )


    }
}
